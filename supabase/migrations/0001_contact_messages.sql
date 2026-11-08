-- Contact-form messages from laimperialmeatmarket.com
create table if not exists public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  phone       text not null,
  email       text,
  store       text,
  topic       text,
  date_needed date,
  message     text not null,
  language    text not null default 'en',
  email_sent  boolean not null default false,
  user_agent  text,
  ip          text
);

create index if not exists contact_messages_created_at_idx on public.contact_messages (created_at desc);

-- Only the server (service-role key) reads/writes this table. With RLS on and
-- no policies, the public anon key cannot read or insert anything.
alter table public.contact_messages enable row level security;
