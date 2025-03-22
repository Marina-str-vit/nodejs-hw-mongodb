import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { getEnvVar } from './utils/getEnvVar.js';
import { getAllStudents, getStudentById } from './services/students.js';

const PORT = Number(getEnvVar('PORT', '3000'));
const app = express();

export const setupServer = () => {
  app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/students', async (req, res) => {
    try {
      const students = await getAllStudents();
      res.status(200).json({
        status: 200,
        message: 'Successfully found students!',
        data: students,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.get('/students/:studentId', async (req, res) => {
    try {
      const { studentId } = req.params;
      const student = await getStudentById(studentId);
      if (!student) {
        return res.status(404).json({
          message: 'Students not found',
        });
      }
      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${studentId}!`,
        data: student,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting contact' });
    }
  });

  app.use((req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};
