/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

//C:\Dropbox\ReactJS2022Lessons\RNLesson1V2>
// paths to local packages
const localPackagePaths = ['/LessonsRN/Lesson1V2'];

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
        sourceExts: ['js', 'json', 'ts', 'tsx'],
      },
    }),
    // resolver: {
    //   nodeModulesPaths: [...localPackagePaths], // update to resolver
    // },
    // watchFolders: [...localPackagePaths], // update to watch
  },
};
