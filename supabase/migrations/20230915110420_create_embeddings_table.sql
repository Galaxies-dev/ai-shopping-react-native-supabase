/*
* Enable PGVector and create tables
*/

create extension vector
with
  schema extensions;

create table categories (
  id serial primary key,
  category text not null,
  embedding vector(384)
);

create table products (
  id serial primary key,
  name text not null,
  category integer references categories(id),
  user_id uuid references auth.users(id),
  historic boolean default false
);


/** 
* Row Level Security
 */
alter table products enable row level security;
alter table categories enable row level security;

create policy "Users can delete their own items."
  on products for delete
  using (auth.uid() = user_id);

create policy "Users can insert their own items."
  on products for insert
  with check ( auth.uid() = user_id );

create policy "Users can see only their own items."
  on products for select
  using (  auth.uid() = user_id);


create policy "Categories are viewable by everyone"
  on categories for select
  to authenticated
  using ( true );


/**
* Function to compare embeddings
*/

create or replace function match_category(
  query_embedding vector(384),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  category text,
  similarity float
)
language sql stable
as $$
  select
    categories.id,
    categories.category,
    1 - (categories.embedding <=> query_embedding) as similarity
  from categories
  where 1 - (categories.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;