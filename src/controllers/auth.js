import { registerUser } from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

// export const loginController = async (req, res) => {
//   const session = await login(req.body);

//   res.cookie('refreshToken', session.refreshToken, {
//     httpOnly: true,
//     expires: session.refreshTokenValidUntil,
//   });

//   res.cookie('sessionId', session.id, {
//     httpOnly: true,
//     expires: session.refreshTokenValidUntil,
//   });

//   res.json({
//     status: 200,
//     message: 'Successfully login user',
//     data: {
//       accessToken: session.accessToken,
//     },
//   });
// };
