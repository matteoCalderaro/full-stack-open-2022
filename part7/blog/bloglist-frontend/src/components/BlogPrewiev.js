const BlogPreview = ({ blog }) => {


  return(
    <>
      <div className='blogPreview'>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontWeight:'bold',marginBottom:10 }}>{blog.title}</span>
        </div>
        <div style={{ display:'flex',justifyContent:'space-between', alignItems:'flex-end' }}>
          <div>
            {/* <div style={{marginBottom:10}}>text: {blog.text}</div> */}
            <span style={{ fontSize:14 }}>published: <strong><em>{blog.user.name}</em></strong></span>
          </div>
          <div style={{ fontSize:14 }}>
            <span>likes: <strong style={{ color:'red',marginRight:10 }}>{blog.likes}</strong></span>
            <span>comments: <strong style={{ color:'red' }}>{blog.comments.length}</strong></span>
          </div>
        </div>

      </div>
    </>
  )
}
export default BlogPreview