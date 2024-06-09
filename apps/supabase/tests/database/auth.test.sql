begin;
select plan(2);

SELECT has_column(
    'auth',
    'sessions',
    'id',
    'id should exist'
);

SELECT has_column(
    'auth',
    'refresh_tokens',
    'id',
    'id should exist'
);

select * from finish();
rollback;
