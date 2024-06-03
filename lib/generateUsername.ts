export function generateUsername(email: string): string {
  // Mendapatkan nama pengguna dari email
  const username = email.split("@")[0];

  // Menghitung panjang nama pengguna
  const usernameLength = username.length;

  // Memastikan panjang nama pengguna minimal 4 karakter
  if (usernameLength < 4) {
    return username + Math.floor(Math.random() * 1000).toString();
  }

  // Mengembalikan nama pengguna
  return username;
}
