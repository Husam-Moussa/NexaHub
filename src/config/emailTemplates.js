export const emailTemplates = {
  verification: {
    senderName: 'NexaHub',
    from: 'noreply@yourdomain.com',
    replyTo: 'support@nexahub.com',
    subject: 'Verify your NexaHub account',
    message: `Hello %DISPLAY_NAME%,

Welcome to NexaHub! Please verify your email address by clicking the link below:

%LINK%

This link will expire in 24 hours.

If you didn't create a NexaHub account, you can safely ignore this email.

Best regards,
The NexaHub Team`,
  },
  passwordReset: {
    senderName: 'NexaHub',
    from: 'noreply@yourdomain.com',
    replyTo: 'support@nexahub.com',
    subject: 'Reset your NexaHub password',
    message: `Hello %DISPLAY_NAME%,

You requested to reset your NexaHub password. Click the link below to set a new password:

%LINK%

This link will expire in 1 hour.

If you didn't request a password reset, you can safely ignore this email.

Best regards,
The NexaHub Team`,
  },
}; 