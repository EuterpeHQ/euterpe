create extension if not exists "pgtap" with schema "extensions";


create table "public"."nonces" (
    "id" bigint generated by default as identity not null,
    "nonce" character varying not null,
    "wallet_address" text not null,
    "used" boolean not null default false,
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid not null default gen_random_uuid()
);


alter table "public"."nonces" enable row level security;

create table "public"."profiles" (
    "user_id" uuid not null default auth.uid(),
    "wallet_address" text,
    "username" text,
    "avatar_url" text,
    "bio" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


alter table "public"."profiles" enable row level security;

CREATE UNIQUE INDEX nonces_nonce_key ON public.nonces USING btree (nonce);

CREATE UNIQUE INDEX nonces_pkey ON public.nonces USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (user_id);

CREATE UNIQUE INDEX profiles_user_id_key ON public.profiles USING btree (user_id);

CREATE UNIQUE INDEX profiles_wallet_address_key ON public.profiles USING btree (wallet_address);

alter table "public"."nonces" add constraint "nonces_pkey" PRIMARY KEY using index "nonces_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."nonces" add constraint "nonces_nonce_key" UNIQUE using index "nonces_nonce_key";

alter table "public"."profiles" add constraint "profiles_user_id_key" UNIQUE using index "profiles_user_id_key";

alter table "public"."profiles" add constraint "profiles_wallet_address_key" UNIQUE using index "profiles_wallet_address_key";

alter table "public"."profiles" add constraint "public_profiles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "public_profiles_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin
  insert into public.profiles (user_id, username, avatar_url)
  values (new.id, 'username', 'avatar_url');
  return new;
end;$function$
;

CREATE OR REPLACE FUNCTION public.siwe(action text, payload jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$declare
  v_wallet_address text;
  v_user_id uuid;
  v_nonce text;
  msg text;
  signature text;
  is_valid boolean;
  token text;

begin
  if action = 'get_nonce' then
    v_wallet_address := payload->>'wallet_address';
    select user_id into v_user_id from profiles where wallet_address = v_wallet_address;
    if v_user_id is null then
      insert into auth.users (id) VALUES (uuid_generate_v4()) returning id into v_user_id;
    end if;
    v_nonce := encode(gen_random_bytes(16), 'hex');
    insert into nonces (nonce, wallet_address, user_id) VALUES (v_nonce, v_wallet_address, v_user_id);
    
    return jsonb_build_object('nonce', v_nonce);

  elsif action = 'verify' then
    -- Extract required fields from payload
    v_wallet_address := payload->>'wallet_address';
    signature := payload->>'signature';
    msg := payload->>'message';

    return jsonb_build_object('payload', payload);
    
    -- -- Verify signature
    -- SELECT n.user_id, n.nonce INTO user_id, nonce
    -- FROM nonces n
    -- JOIN profiles p ON n.user_id = p.id
    -- WHERE p.wallet_address = wallet_address;
    -- IF nonce IS NULL THEN
    --   RAISE EXCEPTION 'Nonce not found for wallet address %', wallet_address;
    -- END IF;
    -- is_valid := pgcrypto.verify(signature, msg, wallet_address);
    -- IF NOT is_valid THEN
    --   RAISE EXCEPTION 'Invalid signature for wallet address %', wallet_address;
    -- END IF;
    -- UPDATE profiles SET wallet_address = wallet_address, updated_at = NOW() WHERE id = user_id;
    -- token := pgjwt.sign(row_to_json((SELECT p FROM profiles p WHERE p.id = user_id)), 'your_jwt_secret_key');
    
    -- -- Return JWT as JSONB
    -- RETURN jsonb_build_object('token', token);

  ELSE
    RAISE EXCEPTION 'Invalid action %', action;
  END IF;
end;$function$
;

grant delete on table "public"."nonces" to "anon";

grant insert on table "public"."nonces" to "anon";

grant references on table "public"."nonces" to "anon";

grant select on table "public"."nonces" to "anon";

grant trigger on table "public"."nonces" to "anon";

grant truncate on table "public"."nonces" to "anon";

grant update on table "public"."nonces" to "anon";

grant delete on table "public"."nonces" to "authenticated";

grant insert on table "public"."nonces" to "authenticated";

grant references on table "public"."nonces" to "authenticated";

grant select on table "public"."nonces" to "authenticated";

grant trigger on table "public"."nonces" to "authenticated";

grant truncate on table "public"."nonces" to "authenticated";

grant update on table "public"."nonces" to "authenticated";

grant delete on table "public"."nonces" to "service_role";

grant insert on table "public"."nonces" to "service_role";

grant references on table "public"."nonces" to "service_role";

grant select on table "public"."nonces" to "service_role";

grant trigger on table "public"."nonces" to "service_role";

grant truncate on table "public"."nonces" to "service_role";

grant update on table "public"."nonces" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

