import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { useEffect, useState, useCallback } from 'react'
import { Message, PostgresSubUpdate } from 'types'

const getInitialMessages = async (
    client: SupabaseClient,
    channelId: string,
): Promise<Message[]> => {
    const result = await client
        .from('messages')
        .select<any, Message>('*')
        .filter('channel_id', 'eq', channelId)
        .order('created_at', { ascending: false })
        .limit(100)

    return result.data?.length ? result.data.reverse() : []
}

const dbFilterChannelMessages = (channelId: string) => ({
    schema: 'public',
    table: 'messages',
    filter: `channel_id=eq.${channelId}`,
    event: 'INSERT',
})

export const useMessages = (
    client: SupabaseClient,
    channelId: string,
    userName: string,
): [messages: Message[], createMessage: (text: string) => void] => {
    const [messages, setMessages] = useState<Message[]>([])

    useEffect(() => {
        getInitialMessages(client, channelId).then(
            (data) => setMessages(data),
            (err: string) =>
                console.log(`error fetching initial messages ${err}`),
        )

        const channel = client.channel(channelId, {
            config: {
                broadcast: { ack: true, self: true },
            },
        })

        channel
            .on(
                'postgres_changes',
                dbFilterChannelMessages(channelId),
                (update: PostgresSubUpdate<Message>) => {
                    if (!update.errors && update.new) {
                        setMessages((oldMessages) => [
                            ...oldMessages,
                            update.new,
                        ])
                    }
                },
            )
            .subscribe((err: string) =>
                console.log(`subscribed to channel ${channelId} ${err}`),
            )

        return () => {
            channel.unsubscribe().then(
                () => console.log(`Unsubscribed from channel ${channelId}`),
                (err) => console.log(err),
            )

            client
                .removeChannel(channel)
                .catch((err: string) =>
                    console.log(`Error removing channel ${err.toString()}`),
                )
        }
    }, [channelId])

    const createMessage = useCallback((text: string) => {
        client
            .from('messages')
            .insert([
                {
                    text,
                    user_name: userName,
                    channel_id: channelId,
                },
            ])
            .then(
                () => 'inserted new message',
                (err) => console.log(err),
            )
    }, [])

    return [messages, createMessage]
}

const defaultAuthKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hdG5mY3Rua3poeHFqdXRjdHhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM3NjkwNTksImV4cCI6MTk3OTM0NTA1OX0.WqpDdtAjkgwMzoaL34J9pT9Y-aw1rvif9INa9UAEPeg'
const defaultUrl = 'https://oatnfctnkzhxqjutctxk.supabase.co'

export const createSupabaseClient = (
    url = defaultUrl,
    authKey = defaultAuthKey,
): SupabaseClient => {
    return createClient(url, authKey)
}
