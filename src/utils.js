export default function cleanWordsData(wd) {
  // ignores words that are null and chop off anything after TRANSLATION-CONTROL
  //console.log('unCleanWordsData:', wd)
  let newWd = []
  wd.forEach( s => {
    let newS = []
    let record = true
    s.forEach( w => {
      if (w !==  null) {
        if (record) {
          newS.push(w)
        }
        if (w[0] === "TRANSLATION-CONTROL") {
          record = false
        }
      }
    } )
    newWd.push(newS)
  } )
  //console.log('cleanedWordsData:', newWd)
  return newWd
}
