import { readdir, readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { exec as cbExec } from 'child_process'
import { promisify } from  'util'

const exec = promisify(cbExec)

const dirs = (await readdir('.', {withFileTypes: true})).filter(_ => _.isDirectory()).map(_ => _.name)
await Promise.all(dirs.map(async dir => {
  const path = join('.', dir)
  const content = await readdir(path, {withFileTypes: true})
  if (!content.find(_ => _.isFile() && _.name === 'index.js')) return
  if (!content.find(_ => _.isFile() && _.name === `${dir}.json`)) return
  const jsonPath = join(path, `${dir}.json`)
  const sourcePath = join(path, 'index.js')
  console.log(`Building ${dir}…`)
  const infile = await readFile(jsonPath)
  const source = await readFile(sourcePath, {encoding: 'utf8'})
  try {
    const jsonContent = JSON.parse(infile)
    jsonContent['javascript'] = source
    await writeFile(jsonPath, JSON.stringify(jsonContent, undefined, 2))
    console.log(`Build for ${dir} finished.`)

    try {
      const result = await exec(`git diff --staged --exit-code ${sourcePath}`)
    } catch {
      await exec(`git add ${jsonPath}`)
    }
  } catch (e) {
    console.error(`Error building ${dir}: ${e.message}`)
    process.exit(1)
  }
}))
