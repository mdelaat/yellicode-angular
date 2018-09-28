/**
 * Contains the output paths that are used by code generation templates.
 */
import * as path from 'path';

export const appDir = '../src/app';
export const componentsDir = path.join(appDir, 'components');
export const servicesDir = path.join(appDir, 'services');
export const styleSheetExtension = '.css'; // Or change the extension to '.scss', '.less', ...
