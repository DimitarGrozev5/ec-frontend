/**
 * Helper function to link image name to image url
 * @param imgName image name
 * @returns url to image
 */
export const getImgUrl = (imgName: string) =>
  `http://localhost:3000/api/photos/${imgName}/file`;
