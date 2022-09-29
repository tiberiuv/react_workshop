import { useState, useRef, useEffect } from 'react'
import { createSupabaseClient, useMessages } from 'useSupabase'
import { Input, Box, Text, Button } from '@chakra-ui/react'

const client = createSupabaseClient()
const userName = 'Tibi'
const defaultChannelId = 'd27fe1d8-a6c9-4d7f-856a-d5a30f7c613a'

export const GlobalChatBox = () => {
    const [inputValue, updateInputValue] = useState('')
    const ref = useRef(null)
    const [messages, createMessages] = useMessages(
        client,
        defaultChannelId,
        userName,
    )
    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView({ behaviour: 'smooth' })
        }
    }, [messages])
    return (
        <Box margin="auto">
            <Box
                height="700px"
                width="600px"
                border="1px solid lightgrey"
                borderRadius="5px"
                marginBottom="10px"
                padding="10px"
                overflow="auto"
            >
                {messages.map((m) => (
                    <Box
                        key={m.id}
                        display="flex"
                        justifyContent="space-between"
                    >
                        <Text>{m.text}</Text>
                        <Text>{m.user_name}</Text>
                    </Box>
                ))}
                <Box display="hidden" ref={ref} />
            </Box>
            <Box display="flex" flexDirection="row">
                <Input
                    marginRight="5px"
                    onChange={(e) => updateInputValue(e.target.value)}
                    value={inputValue}
                />
                <Button onClick={() => createMessages(inputValue)}>
                    Send message
                </Button>
            </Box>
        </Box>
    )
}
