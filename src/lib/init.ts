export const initializeApp = () => {
  // Initialize admin user if not exists
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  
  if (!users.find((u: any) => u.email === 'admin@minishop.com')) {
    users.push({
      id: 'admin-1',
      email: 'admin@minishop.com',
      password: 'admin123',
      name: 'Admin User',
      isAdmin: true,
    });
    localStorage.setItem('users', JSON.stringify(users));
  }
};
