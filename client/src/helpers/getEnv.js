// export const getEnv = (envname) => {
//     const env =  import.meta.env
//     return env[envname]
// }
export const getEnv = (key) => {
  return import.meta.env[key];
};
