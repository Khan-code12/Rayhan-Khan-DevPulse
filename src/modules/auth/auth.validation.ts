export const signupValidation = (body: any): string | null => {
  const { name, email, password, role } = body;
  if (!name) return 'Display name must be explicitly provided';
  if (!email || !email.includes('@')) return 'A valid unique email identifier is mandatory';
  if (!password || password.length < 5) return 'Secure password string required';
  if (role && role !== 'contributor' && role !== 'maintainer') return 'Role value configuration is invalid';
  return null;
};

export const loginValidation = (body: any): string | null => {
  if (!body.email) return 'Authentication email routing parameter required';
  if (!body.password) return 'Matching credentials token sequence mapping missing';
  return null;
};