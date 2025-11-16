/* eslint-disable no-console */
// oxlint-disable no-console
export class LoggerUtil {
  static debug(message?: any, ...optionalParams: any[]): void {
    console.debug(message, ...optionalParams)
  }

  static error(message?: any, ...optionalParams: any[]): void {
    console.error(message, ...optionalParams)
  }

  static info(message?: any, ...optionalParams: any[]): void {
    console.log(message, ...optionalParams)
  }

  static warn(message?: any, ...optionalParams: any[]): void {
    console.warn(message, ...optionalParams)
  }
}
