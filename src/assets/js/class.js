let data = {
  id: 0,
  createTime: 0,
  introduction: '',
  isVote: false,
  playerUrl: '',
  pushUrl: '',
  title: '',
  wxShareContent: '',
  wxSharePic: '',
  coverImg: ''
};

export class LivePlayer {
  constructor(liveInfo = data) {
    for (var attr in liveInfo) {
      this[attr] = liveInfo[attr] || '';
    }
    if (!this.commentList) {
      this.setCommentList(new Array());
    }
    if (!this.programList) {
      this.setProgramList(new Array());
    }
  }
  setProgramList(list) {
    this.programList = list;
  }
  setCommentList(list) {
    this.commentList = list;
  }
}
