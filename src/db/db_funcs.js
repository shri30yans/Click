import { supabase } from '$lib/supabaseClient.js'
// @ts-ignore
// @ts-ignore
import { writable, get } from 'svelte/store'
export const chat = writable([])


// @ts-ignore
// @ts-ignore
let isAdded = false
let initChatCount = 25
let tableName = 'global_chat'

export const loadChat = async () => {
  // @ts-ignore
  // @ts-ignore
  const { data, error } = await supabase.from(tableName).select().order('id', { ascending: false }).limit(initChatCount)
  // @ts-ignore
  chat.set(data.reverse())
  console.log('Chat loaded',chat);

  // @ts-ignore
  const mySubscription = supabase
    .channel(tableName)
    // @ts-ignore
    .on('INSERT', (payload) => {
      // @ts-ignore
      chat.set([...data, payload.new])
      loadChat()
    })
    .subscribe()
  }

export const loadMore = async () => {
  console.log("load more called")
  // @ts-ignore
  const { data, error } = await supabase
    .from(tableName)
    .select()
    .order('id', { ascending: false })
    .limit((initChatCount += 5))
  // @ts-ignore
  chat.set(data.reverse())
}

// @ts-ignore
export const sendMessage = async (userId,username, message) => {
  // @ts-ignore
  const { data, error } = await supabase
    .from(tableName)
    .insert([{userId,username,message}])
  loadChat()

  if (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}




