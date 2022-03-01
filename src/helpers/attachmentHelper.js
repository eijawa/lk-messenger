export const getAttachmentInfo = path => {
  const attachmentSplitted = path.split('/');
  const attachmentFullFileName = attachmentSplitted[attachmentSplitted.length - 1];
  const attachmentFullFileNameSplitted = attachmentFullFileName.split('.');

  const attachmentFileName = attachmentFullFileNameSplitted.slice(0, attachmentFullFileNameSplitted.length).join('.');
  const attachmentFileType = attachmentFullFileNameSplitted[attachmentFullFileNameSplitted.length - 1];

  return {
    fileName: attachmentFileName,
    fileType: attachmentFileType,
  };
};