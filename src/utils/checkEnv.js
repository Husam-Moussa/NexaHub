const checkEnvVariables = () => {
  const requiredEnvVars = [
    // Add your new required environment variables here
  ];

  // Check if all variables exist
  const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Missing environment variables:', missingVars);
    return false;
  }

  // Check if values are not empty strings
  const emptyVars = requiredEnvVars.filter(varName => !import.meta.env[varName].trim());
  
  if (emptyVars.length > 0) {
    console.error('❌ Empty environment variables:', emptyVars);
    return false;
  }

  console.log('✅ All environment variables are properly configured!');
  return true;
};

export default checkEnvVariables; 