export class LivePlayer {
  constructor(liveInfo) {
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
