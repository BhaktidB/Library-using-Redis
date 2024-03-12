'use server'

import {
  client
} from "@/lib/db"
import {
  redirect
} from 'next/navigation'

export async function createBook(formData) {
  const {
    title,
    rating,
    author,
    blurb
  } = Object.fromEntries(formData)

  // create id for books
  const id = Math.floor(Math.random() * 100000000);

  // unique books
  const uniqueBook=await client.zAdd('books',{
    value:title,
    score:id
  },
  {
    NX:true
  })

  if(!uniqueBook){
    return {error:'Book already exists'}
  }
  // save new hash for the book
  await client.hSet(`books:${id}`, {
    title,
    rating,
    author,
    blurb
  })

  redirect('/')
}