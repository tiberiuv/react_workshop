import { Button, Box, Text } from '@chakra-ui/react'
import { useState, useRef, useEffect } from 'react'
import { useMessages, createSupabaseClient, useChannels } from 'useSupabase'

const client = createSupabaseClient()
const userName = 'giorgio_pea'
const defaultChannelId = 'd27fe1d8-a6c9-4d7f-856a-d5a30f7c613a'

export const GlobalChatBox = () => { }
