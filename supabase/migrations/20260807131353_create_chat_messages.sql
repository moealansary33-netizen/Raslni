/*
# Create chat_messages table for courier-client chat

1. New Tables
- `chat_messages`
  - `id` (uuid, primary key)
  - `order_id` (text, not null) - identifies the conversation/order thread
  - `sender` (text, not null) - either 'client' or 'courier'
  - `content` (text, not null) - the message text
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `chat_messages`.
- Allow anon + authenticated CRUD because this is a no-auth demo app with intentionally shared chat data.
3. Notes
- This is a single-tenant demo chat; all messages are publicly readable/writable.
*/

CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id text NOT NULL,
  sender text NOT NULL CHECK (sender IN ('client', 'courier')),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_order_id_created ON chat_messages (order_id, created_at);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_chat_messages" ON chat_messages;
CREATE POLICY "anon_select_chat_messages"
ON chat_messages FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_chat_messages" ON chat_messages;
CREATE POLICY "anon_insert_chat_messages"
ON chat_messages FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_chat_messages" ON chat_messages;
CREATE POLICY "anon_delete_chat_messages"
ON chat_messages FOR DELETE
TO anon, authenticated USING (true);
