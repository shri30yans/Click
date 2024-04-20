// @ts-nocheck
import { supabase } from '$lib/supabaseClient.js'
// @ts-ignore
import { writable, get } from 'svelte/store'
export const chat = writable([])


// @ts-ignore
let isAdded = false
// @ts-ignore
let initChatCount = 5
let tableName = 'global_chat'

export const loadChat = async () => {
  const { data, error } = await supabase.from(tableName).select().order('id', { ascending: false }).limit(initChatCount)
  chat.set(data.reverse())
  console.log("chat loaded");
  const channel = supabase
    .channel(tableName)
    .on('postgres_changes',
    {
      schema: 'public', // Subscribes to the "public" schema in Postgres
      event: 'INSERT',       // Listen to all changes
    },
    payload => {
      console.log('Change received!', payload)
      loadChat()
    })
    .subscribe()
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
