const iqdb = require('iqdb-client')
const { segment } = require('koishi-utils')

function apply(koishi, options) {
  koishi
    .command('iqdb [image:text] iqdb.org image search')
    .action(async ({ session }, image) => {
      if (!image) return 'No image given'
      let url = extractImages(session.message)
      if (url.length < 1) return '未检测到图片'
      if (url.length > 1) return '图片数量过多'

      let msg = await makeSearch(url[0])
      session.send(segment('quote', { id: session.messageId }) + msg)
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

async function makeSearch(url) {
  const res = await iqdb(url, { lib: 'www' })
  if (res.ok && res.data && res.data.length > 1) {
    let data = res.data[1]
    let { head, sourceUrl, img, type, source } = data
    return `标题：${head}
来源：${sourceUrl}
图片：${img}
H图？${type.toLowerCase() === 'safe' ? '否' : '是'}
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
