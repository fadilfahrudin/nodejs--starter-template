const { createUserSchema, usersParams, updateUserSchema, loginSchema, userProfilSchema } = require("../schemas/userSchemas.js")
const { createUser, getUsers, getUserById, updateUser, loginUser, logoutUser, getProfileByUserId, updateProfileService } = require('../services/userServices.js');
const { successResponse } = require('../helpers/responseHelper.js');
const AppError = require('../helpers/AppError.js');


const registrationController = async (req, res, next) => {
    try {
        // 1. validasi data input dari body
        const { error, value } = createUserSchema.validate(req.body);

        // 2. throw error jika validasi gagal
        if (error) {
            throw new AppError(error.message, 400);
        }

        // 3. panggil service
        await createUser(value);

        // 4. kirim response
        successResponse(res, "Success create user", null, 201);
    } catch (error) {
        next(error);
    }
}

const getUsersController = async (req, res, next) => {
    try {
        // 1. validasi data input dari query
        const { error, value } = usersParams.validate(req.query);

        // 2. throw error jika validasi gagal
        if (error) throw new AppError(error.message, 400);

        // 3. panggil service
        const users = await getUsers(value.limit, value.offset, value.keywords);

        // 4. kirim response
        successResponse(res, "Success get all users", users);
    } catch (error) {
        next(error);
    }
};

const getUserByIdController = async (req, res, next) => {
    try {
        const user = await getUserById(req.params.id);
        const data = {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role,
            status: user.status,
            createdAt: user.createdAt
        }
        successResponse(res, "Success get user by id", data);
    } catch (error) {
        next(error);
    }
};

const updateUserController = async (req, res, next) => {
    try {
        const { error, value } = updateUserSchema.validate(req.body)

        if (error) throw new AppError(error.message, 400)

        await updateUser(req.params.id, value)

        successResponse(res, "Update user success", null)
    } catch (error) {
        next(error)
    }
};

const deleteUserController = async (req, res, next) => {
    try {
        const user = await getUserById(req.params.id);
        await user.destroy();
        successResponse(res, "Success delete user", null, 200);
    } catch (error) {
        next(error);
    }
};


const loginController = async (req, res, next) => {
    try {
        const { error, value } = loginSchema.validate(req.body);
        if (error) throw new AppError(error.message, 400);
        const { refreshToken, accessToken } = await loginUser(value);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // max umur 24 hours
            secure: process.env.NODE_ENV === "production",
            sameSite: 'lax',
        })
        successResponse(res, "Success login", { accessToken: accessToken });
    } catch (error) {
        next(error);
    }
}
const logoutController = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) throw new AppError("Refresh token not found", 400);
        await logoutUser(refreshToken);
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'lax',
        });
        successResponse(res, "Success logout", null);
    } catch (error) {
        next(error);
    }
}
const updateProfileController = async (req, res, next) => {
    try {
        // 1. chekc validasi type 
        const { error } = userProfilSchema.validate(req.body);

        // 2. throw error
        if (error) throw new AppError(error.message, 400);

        // 3. Proses file upload
        if (!req.file['profilePicture']) throw new Error('No file uploaded!');

        // 4. simpan file path
        const NewProfilePictureUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

        // 5. simpan file name
        const newFileName = req.file.filename;

        // 6. simpan data
        const data = {
            profilePictureUrl: NewProfilePictureUrl,
            newFileName: newFileName
        }

        // 7. panggil service
        const userProfile = await updateProfileService(req.params.id, data);

        // 8. kirim response
        successResponse(res, "Success update profile", userProfile);

    } catch (error) {
        next(error);
    }
}

module.exports = {
    getUsersController,
    getUserByIdController,
    updateUserController,
    deleteUserController,
    registrationController,
    loginController,
    logoutController,
    updateProfileController
};