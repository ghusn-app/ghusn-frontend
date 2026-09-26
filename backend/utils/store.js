import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const usersPath = path.join(__dirname, '..', 'data', 'users.json')

export const ensureUserStore = async () => {
  try {
    await fs.access(usersPath)
  } catch {
    await fs.mkdir(path.dirname(usersPath), { recursive: true })
    await fs.writeFile(usersPath, '[]', 'utf-8')
  }
}

export const readUsers = async () => {
  await ensureUserStore()

  const raw = await fs.readFile(usersPath, 'utf-8')
  return JSON.parse(raw || '[]')
}

export const writeUsers = async (users) => {
  await ensureUserStore()
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2), 'utf-8')
}
