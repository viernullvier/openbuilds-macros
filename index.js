import { readdir, readFile, writeFile } from 'fs/promises'
import { join } from 'path'

const dirs = (await readdir('.', {withFileTypes: true})).filter(_ => _.isDirectory()).map(_ => _.name)
await Promise.all(dirs.map(async dir => {
  const path = join('.', dir)
  const content = await readdir(path, {withFileTypes: true})
  if (!content.find(_ => _.isFile() && _.name === 'index.js')) return
  if (!content.find(_ => _.isFile() && _.name === `${dir}.json`)) return
  const jsonPath = join(path, `${dir}.json`)
  console.log(`Building ${dir}…`)
  const infile = await readFile(jsonPath)
  const source = await readFile(join(path, 'index.js'), {encoding: 'utf8'})
  try {
    const jsonContent = JSON.parse(infile)
    jsonContent['javascript'] = source
    await writeFile(jsonPath, JSON.stringify(jsonContent, undefined, 2))
    console.log(`Build for ${dir} finished.`)
  } catch (e) {
    console.error(`Error building ${dir}: ${e.message}`)
  }
}))
