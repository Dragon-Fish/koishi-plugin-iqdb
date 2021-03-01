const { searchPic } = require('iqdb-client')
const { segment } = require('koishi-utils')

function apply(koishi, pluginOpt) {
  let defaultOpt = {
    alias: [],
    commandAuthority: 1,
    unsafeAuthority: 1,
  }
  pluginOpt = Object.assign(defaultOpt, pluginOpt)

  koishi
    .command('iqdb <image:text>', { authority: pluginOpt.commandAuthority })
    .usage('使用iqdb.org搜图')
    .alias(...pluginOpt.alias)
    .option('unsafe', '-u 允许不健全的图片结果显示', {
      authority: pluginOpt.unsafeAuthority,
    })
    .action(async ({ session }, image) => {
      let finalImage = image
      if (!image) {
        session.send('请在15秒内发送图片~')
        finalImage = await session.prompt(15 * 1000)
      }

      let url = extractImages(finalImage)
      console.log(url)
      if (url.length < 1) return image ? '没有检测到图片' : null
      if (url.length > 1) return '图片数量过多'

      let msg = await makeSearch(url[0], pluginOpt)
      session.send(segment('quote', { id: session.messageId }) + ' ' + msg)
    })
}

function extractImages(message) {
  const imageRE = /\[CQ:image,file=([^,]+),url=([^\]]+)\]/g
  let search = imageRE.exec(message)
  const result = []
  while (search) {
    result.push(search[2])
    search = imageRE.exec(message)
  }
  return result
}

async function makeSearch(url, options) {
  const res = await searchPic(url, { lib: 'www' })
  console.log(res)
  if (res.ok || (res.data && res.data.length > 1)) {
    let data = res.data[1]
    let { head, sourceUrl, img, type, source } = data
    let showImg = ''
    if (options.unsafe || type.toLowerCase() === 'safe') {
      showImg = segment('image', { url: 'https://iqdb.org' + img })
    } else {
      showImg = `预览：https://iqdb.org${img} ⚠️`
    }
    return `${showImg}
准度：${head.toLowerCase()}
来源：${sourceUrl}
色图：${type.toLowerCase() === 'safe' ? '否' : '是⚠️'}
源站：${source.join(', ')}
`
  } else if (res.err) {
    return '搜图时遇到亿点问题：' + res.err
  } else {
    return '搜图时遇到未知问题……'
  }
}

module.exports.name = 'plugin-iqdb'
module.exports.apply = apply
