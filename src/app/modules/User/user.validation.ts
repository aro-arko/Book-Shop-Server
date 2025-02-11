import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Name must be a string',
      })
      .min(1, 'Name cannot be empty'),

    email: z
      .string({
        invalid_type_error: 'Email must be a string',
      })
      .email('Email must be a valid string'),

    password: z
      .string({
        invalid_type_error: 'Password must be a string',
      })
      .min(8, 'Password must be at least 8 characters')
      .max(100, 'Password is too long'),
  }),
});

const userLoginValidationSchema = z.object({
  body: z.object({
    email: z.string({
      invalid_type_error: 'Email must be string',
    }),
    password: z
      .string({
        invalid_type_error: 'Password must be string',
      })
      .min(8, 'Password must be at least 8 characters')
      .max(100, 'Password is too long'),
  }),
});

export const userValidations = {
  userValidationSchema,
  userLoginValidationSchema,
};
