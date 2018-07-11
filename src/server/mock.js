

import Mock from 'mockjs'
// API根目录
const Random = Mock.Random
const mock = {}

mock.getProgramList =  Mock.mock(/getProgramList/, {
  'programList|12': [{
    'ID|+1': 0, 
    'ProgramName|20': '',
    'Actor|6': '',
    'VoteCount|1-100': 0,
    "IsVote|1-2":false
  }]
})

// mock. = Mock.mock(/vote/, {
//   'newsList|1-10': [{
//     'id|+1': 0,
//     'name|3-10': '',
//     'desc':Random.paragraph(),
    
//   }]
// })

export default mock
