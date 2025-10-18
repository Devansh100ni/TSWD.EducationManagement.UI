export class ConstantsClass {
  static readonly ApiDown = 'API is down or unreachable. Please try again later.';
  static readonly Unauthorized = 'Unauthorized access!';
  static readonly UnknownError = 'An unknown error occurred. Please try again.';
  static readonly InvalidForm = 'Please fill all required fields correctly before submitting.';

  static Success(entity: string, action: string): string {
    return `${entity} ${action} successfully!`;
  }

 
}
