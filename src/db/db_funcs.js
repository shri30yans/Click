import { supabase } from '$lib/supabaseClient.js'
// @ts-ignore
import { writable, get } from 'svelte/store'
export const chat = writable([])

// @ts-ignore
let isAdded = false
let initChatCount = 25
let tableName = 'global_chat'

// export const loadChat = async () => {
//   // @ts-ignore
//   const { data, error } = await supabase.from(tableName).select().order('id', { ascending: false }).limit(initChatCount)
//   // @ts-ignore
//   chat.set(data.reverse())

//   // @ts-ignore
//   const mySubscription = supabase
//     .from(tableName)
//     // @ts-ignore
//     .on('INSERT', (payload) => {
//       // @ts-ignore
//       chat.set([...data, payload.new])
//       loadChat()
//     })
//     .subscribe()
// }

// export const loadMore = async () => {
//   // @ts-ignore
//   const { data, error } = await supabase
//     .from(tableName)
//     .select()
//     .order('id', { ascending: false })
//     .limit((initChatCount += 5))
//   // @ts-ignore
//   chat.set(data.reverse())
// }

// @ts-ignore
export const sendMessage = async (userId,username, message) => {
  // @ts-ignore
  const { data, error } = await supabase
    .from(tableName)
    .insert([{userId,username,message}])
  // loadChat()

  if (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}



// // Add username and timestamp when it was created.
// // @ts-ignore
// export const addUserdata = (username, timestamp) => {

//   // @ts-ignore
//   if (loadUserdata().tempUser == null) {
//     setUserdata(username, timestamp)
//   }
// }
