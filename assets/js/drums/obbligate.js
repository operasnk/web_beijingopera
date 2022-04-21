function getCommentList() {
  $.ajax({
    method: 'GET',
      url: '/my/obb/cates',
        success: function(res) {
          if (res.status !== 0) return alert('获取伴奏列表失败！')
          var htmlStr = template('tpl-obb', res) //相当于吧内容塞进模板里
            $('#obb-list').html(htmlStr) //把放好内容的模板放到body对应的位置
      }
  })
}
  getCommentList()