begin;
select plan(9);

select has_function(
    'public',
    'siwe',
    array ['text', 'jsonb'],
    'siwe should exist'
);

select function_lang_is(
    'siwe', 
    array ['text', 'jsonb'], 'plpgsql',
    'siwe is plpgsql'
);
select function_returns(
    'siwe',
    'jsonb'
);

-- ==============================================================

\set wallet_address '\'0xabcde12345\''
-- \set nonce_result (SELECT siwe('get_nonce', jsonb_build_object('wallet_addjhress', :'wallet_address')::jsonb)->>'nonce')

SELECT is(
    (SELECT siwe('get_nonce', jsonb_build_object('wallet_address', :'wallet_address')::jsonb)->>'nonce') IS NOT NULL,
    true,
    'Nonce should be generated and returned'
);

SELECT is(
    EXISTS(SELECT 1 FROM nonces WHERE wallet_address = :'wallet_address'),
    true,
    'Nonce should exist in the database for the given wallet address'
);

SELECT is(
    EXISTS(SELECT 1 FROM nonces WHERE user_id IS NOT NULL),
    true,
    'User ID should be associated with the nonce in the database'
);

SELECT is(
    EXISTS(SELECT 1 FROM nonces WHERE used = false),
    true,
    'Nonce should be marked as unused'
);

SELECT throws_ok(
    'select siwe(''get_nonce'', jsonb_build_object(''wallet_address'', NULL)::jsonb)',
    '23502',
    'null value in column "wallet_address" of relation "nonces" violates not-null constraint',
    'Handling of NULL wallet address should produce an error'
);

-- ==============================================================

SELECT is(
    (SELECT siwe('verify', jsonb_build_object('wallet_address', 'wallet_address', 'signature', 'sig', 'message', 'msg')::jsonb)->>'payload') IS NOT NULL,
    true,
    'Payload is correct'
);

-- \set wallet_address '0xAbC12345CAb12345C12345CAB12345C123456789'
-- \set nonce '123456'
-- \set signature 'generated_signature_here'

-- SELECT is(
--     (SELECT siwe('verify', format('example.com wants you to sign in with your Ethereum account:\n%s\nThis service is requesting you sign your one-time nonce: %s\nURI: https://example.com/login\nVersion: 1\nChain ID: 1\nNonce: %s\nIssued At: 2023-06-01T12:00:00Z', :'wallet_address', :'nonce', :'nonce'), :'signature')::boolean),
--     true,
--     'SIWE verification should succeed'
-- );

select * from finish();
rollback;
