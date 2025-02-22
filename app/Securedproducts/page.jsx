import SecuredProductpagefirst from '@components/Securedproducts/SecuredProdutpagefirst'
import SecuredProductpagesecond from '@components/Securedproducts/SecuredProductpagesecond'
import SecuredQuestionPage from '@components/Securedproducts/SecuredQuestionPage'
import React from 'react'

function page({params}) {
  return (
    <div>
      <SecuredProductpagefirst params={params}/>
      {/* <SecuredProductpagesecond/> */}
      {/* <SecuredQuestionPage/> */}
    </div>
  )
}

export default page
