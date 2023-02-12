import bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
  let hashedPassword = '';

  await bcrypt.hash(password, 10)
    .then(hash => {
      hashedPassword = hash;
    })
    .catch(err => console.error(err));

  return hashedPassword;
}

export async function checkPassword(password: string, hashedPassword: string) {
  let isOk = false;

  await bcrypt.compare(password, hashedPassword)
    .then(res => {
      isOk = res;
    })
    .catch(err => console.log(err));

  return isOk;
}
