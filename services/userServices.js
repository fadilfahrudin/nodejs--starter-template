const { User, Profile, Role } = require('../models/index.js');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AppError = require('../helpers/AppError.js');

exports.createUser = async (data) => {
    // 1. deklarasi
    const { fullname, email, password, confirm_password, roleId } = data
    let userStatus = 'inactive'

    // 2. cari username dan email yang terdaftar
    const users = await User.findOne({
        where: {
            [Op.or]: [
                // { username }, // jika menggunakan username
                { email }
            ]
        }
    })

    // 3. throw error jika username atau email yang di input sudah terdaftar
    if (users) {
        throw new AppError('Username or email already exists', 400);
    }

    // 4. throw error jika password dan confirm password tidak sama
    if (password !== confirm_password) {
        throw new AppError('Password and confirm password do not match', 400);
    }

    // 5. hash password
    const hashedPassword = bcrypt.hashSync(String(password), 10);

    // 6. cari role id = superadmin
    const roleSuperAdmin = await Role.findOne({
        where: {
            name: 'superadmin'
        }
    })

    // 7. cari user yang memiliki role superadmin
    const superAdmin = await User.findOne({
        where: {
            roleId: roleSuperAdmin.id
        }
    })

    // 8. jika superadmin tidak ada maka user status default active
    if (!superAdmin) {
        if (roleId === roleSuperAdmin.id) {
            userStatus = 'active'
        }
    } else if (roleId === roleSuperAdmin.id) {
        // 9. throw error jika role sama dengan superadmin (superadmin hanya boleh 1 di tabel user)
        throw new AppError('Superadmin already exists', 400);
    }

    // 10. create user
    const user = await User.create({
        email,
        password: hashedPassword,
        roleId,
        status: userStatus
    })

    // 11. create profile
    await Profile.create({ userId: user.id, fullName: fullname })
}

exports.getUsers = async (limit = 10, offset = 0, keywords = "") => {
    const validateLimit = Math.max(1, parseInt(limit));
    const validateOffset = Math.max(0, parseInt(offset));

    const whereCondition = keywords
        ? {
            [Op.or]: [
                { name: { [Op.like]: `%${keywords}%` } },
                { role: { [Op.like]: `%${keywords}%` } },
                { email: { [Op.like]: `%${keywords}%` } },
                { username: { [Op.like]: `%${keywords}%` } },
                { status: { [Op.like]: keywords } },
            ],
        }
        : undefined;

    const { count, rows } = await User.findAndCountAll({
        where: whereCondition,
        limit: validateLimit,
        offset: validateOffset
    })


    if (count === 0) {
        throw new AppError(`No user found`, 404);
    }

    const data = rows.map((user) => {
        return {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role,
            status: user.status,
            createdAt: user.createdAt
        }
    })

    return {
        count: count,
        rows: data,
        currentPage: Math.ceil(offset / limit) + 1,
        totalPages: Math.ceil(count / limit),
    }
}

exports.getUserById = async (id) => {
    const user = await User.findByPk(id);
    if (!user) {
        throw new AppError('User not found', 404);
    }
    return user
}

exports.updateUser = async (id, data) => {
    const user = await this.getUserById(id)
    await user.update(data)
    return user
}

exports.loginUser = async (data) => {
    const MAX_ATTEMPTS = 3;
    const LOCK_TIME_MINUTES = 10;


    // 1. deklarasi
    const { email, password } = data

    // 2. cari user
    const user = await User.findOne({ where: { email } })

    // 3. throw error jika user tidak ditemukan
    if (!user) throw new AppError('User not found', 404);

    // 4. throw error jika user status inactive
    if (user.status === 'inactive') throw new AppError('User is inactive', 400)

    // 5. Cek apakah user terkunci karena terlalu banyak gagal login
    const now = new Date();
    if (
        user.loginAttempts >= MAX_ATTEMPTS &&
        user.lastLoginAttempt &&
        now - user.lastLoginAttempt < LOCK_TIME_MINUTES * 60 * 1000
    ) {
        throw new AppError(
            `Account locked. Please try again after ${LOCK_TIME_MINUTES} minutes.`,
            429
        );
    }

    // 6. verifikasi password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        // Update percobaan login gagal
        await user.update({
            loginAttempts: user.loginAttempts + 1,
            lastLoginAttempt: now
        });
        throw new AppError('Password is incorrect', 400)
    };

    // 7. Set Access Token
    const accessToken = jwt.sign({ id: user.id, username: user.username, email: user.email }, process.env.SECRET_TOKEN_KEY, {
        expiresIn: '20s'
    })

    // 8. Set Refresh Token
    const refreshToken = jwt.sign({ id: user.id, username: user.username }, process.env.REFRESH_TOKEN_KEY, {
        expiresIn: '1d'
    })

    // 9. Jika login berhasil, reset loginAttempts dan set refreshToken
    await user.update({
        refreshToken,
        loginAttempts: 0,
        lastLoginAttempt: null
    });

    // 10. return
    return {
        accessToken,
        refreshToken
    }

}

exports.logoutUser = async (refreshToken) => {
    // 1. cari user
    const user = await User.findOne({
        where: { refreshToken }
    })

    // 2. throw error jika user tidak ditemukan
    if (!user) throw new AppError('User not found', 404);

    // 3. update refresh token
    await user.update({ refreshToken: null })
}

exports.getProfileByUserId = async (id) => {
    const userProfile = await Profile.findOne({
        where: {
            userId: id
        }
    })

    if (!userProfile) throw new AppError('Profile not found', 404)

    return userProfile
}

exports.updateProfileService = async (id, data) => {
    const { profilePictureUrl, newFileName } = data;

    if (!id) throw new AppError('User ID is required', 404);

    const userProfile = await this.getProfileByUserId(id);

    let oldProfilePicture;

    if (userProfile) {
        // Simpan URL lama
        oldProfilePicture = userProfile.profilePicture;

        // Update profile dengan file baru
        userProfile.profilePicture = profilePictureUrl;
        await userProfile.save();
    }

    // Hapus file lama jika ada
    if (oldProfilePicture) {
        const oldFileName = path.basename(new URL(oldProfilePicture).pathname); // Ekstrak nama file dari URL
        const oldFilePath = path.join('public/uploads', oldFileName);

        // Pastikan file lama berbeda dari file baru sebelum menghapus
        if (oldFileName !== newFileName) {
            fs.unlink(oldFilePath, (err) => {
                if (err) {
                    console.error('Error deleting old file:', err);
                } else {
                    console.log('Old file deleted successfully');
                }
            });
        }
    }

    return userProfile
}