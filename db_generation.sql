-- drop database if exists anime_set;
-- create database if not exists anime_set;
-- use anime_set;

-- -- -- -- -- -- -- Entities: -- -- -- -- --
-- -- -- --------------------------------- --
-- drop table if exists releases;
-- create table if not exists releases(
-- 	id 			    varchar(36)  not null unique,
--     translated_name varchar(255) not null,
--     original_name   varchar(255),
--     release_year 	integer  	 not null,
--     ongoing 		boolean,
--     description 	text		 not null,
--     image_url    	text		 not null,
-- 	episodes 		integer,
	
--     primary key(id)
-- );

-- drop table if exists voicers;
-- create table if not exists voicers(
-- 	id 	     varchar(36)  not null unique,
--     nickname varchar(255) not null ,
    
--     primary key(id)
-- );

-- drop table if exists genres;
-- create table if not exists genres(
-- 	id 	 varchar(36)  not null unique,
--     name varchar(255) not null,
    
--     primary key(id)
-- );

-- create table if not exists users(
-- 	id 	 	  varchar(36)  not null unique,
--     nickname  varchar(255) not null,
--     pass_hash varchar(255) not null,
-- 	image_url text		   not null,
    
--     primary key(id)
-- );

-- drop table if exists comments;
-- create table if not exists comments(
-- 	id 	 	   varchar(36)  not null unique,
--     user_id    varchar(36)  not null,
--     release_id varchar(36)  not null,
-- 	content    text,
    
--     primary key(id)
-- );

-- -- -- -- -- --  Intermediate:  -- -- -- --
-- -- -- --------------------------------- --
-- drop table if exists release_genres;
-- create table if not exists release_genres(
--     release_id varchar(36)  not null,
--     genre_id   varchar(36)  not null
-- );

-- drop table if exists release_voicers;
-- create table if not exists release_voicers(
--     release_id varchar(36)  not null,
--     voicer_id  varchar(36)  not null
-- );