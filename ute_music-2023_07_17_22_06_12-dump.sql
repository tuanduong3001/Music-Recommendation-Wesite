CREATE TABLE `users` (
            `id` int(11) NOT NULL AUTO_INCREMENT, 
            `name` varchar(225) DEFAULT NULL,
            `email` varchar(255) DEFAULT NULL,
            `avatar` varchar(255) DEFAULT NULL,
            `dateOfBirth` Date DEFAULT NULL,
            `gender` tinyint NOT NULL DEFAULT 1,
            `role` tinyint NOT NULL DEFAULT 1,
            `password` varchar(255) DEFAULT NULL,
            `resetPasswordExpires` DATETIME DEFAULT NULL,
            `resetPasswordToken` varchar(255) DEFAULT NULL,
            `created_at` TIMESTAMP NOT NULL DEFAULT (UTC_TIMESTAMP),
            `updated_at` TIMESTAMP NOT NULL DEFAULT (UTC_TIMESTAMP),
            PRIMARY KEY (`id`))
            ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `categories` (
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `name` varchar(225) DEFAULT NULL,
            `created_at` TIMESTAMP NOT NULL DEFAULT (UTC_TIMESTAMP), 
            `updated_at` TIMESTAMP NOT NULL DEFAULT (UTC_TIMESTAMP), 
            PRIMARY KEY (`id`))
            ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `musics` (
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `name` varchar(225) NOT NULL,
            `category_id` int(11) DEFAULT NULL,
            `source` varchar(225) NOT NULL,
            `image` varchar(225) NOT NULL,
            `view` int(11) DEFAULT 0,
            `like` int(11) DEFAULT 0,
            `duration` int(11) DEFAULT 0,
            `created_at` TIMESTAMP NOT NULL DEFAULT (UTC_TIMESTAMP),
            `updated_at` TIMESTAMP NOT NULL DEFAULT (UTC_TIMESTAMP),
            KEY `FK_3373bsd2341s8965d9238413sbc` (`category_id`), 
            CONSTRAINT `FK_3373bsd2341s8965d9238413sbc` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION, 
            PRIMARY KEY (`id`))
            ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

  CREATE TABLE `user_history` (
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `user_id` int(11) DEFAULT NULL,
            `music_id` int(11) DEFAULT NULL,
            `created_at` TIMESTAMP NOT NULL DEFAULT (UTC_TIMESTAMP), 
            `updated_at` TIMESTAMP NOT NULL DEFAULT (UTC_TIMESTAMP), 
            KEY `FK_3373bsd2341s8965d9212313sbc` (`user_id`), 
            KEY `FK_3373bsd2341s8965d9212314sbc` (`music_id`), 
            CONSTRAINT `FK_3373bsd2341s8965d9212313sbc` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION, 
            CONSTRAINT `FK_3373bsd2341s8965d9212314sbc` FOREIGN KEY (`music_id`) REFERENCES `musics` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION, 
            PRIMARY KEY (`id`))
            ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

 CREATE TABLE `artists` (
            `id` int(11) NOT NULL AUTO_INCREMENT, 
            `name` varchar(225) NOT NULL,
            `image` varchar(225) NOT NULL,
            `title` varchar(225) NOT NULL,
            `created_at` TIMESTAMP NOT NULL DEFAULT (UTC_TIMESTAMP),
            `updated_at` TIMESTAMP NOT NULL DEFAULT (UTC_TIMESTAMP),
            PRIMARY KEY (`id`))
            ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `music_artist` (
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `artist_id` int(11) DEFAULT NULL
            `music_id` int(11) DEFAULT NULL
             `created_at` TIMESTAMP NOT NULL DEFAULT (UTC_TIMESTAMP)
              `updated_at` TIMESTAMP NOT NULL DEFAULT (UTC_TIMESTAMP)
              KEY `FK_3373bsd2341s8965d9212333sbc` (`artist_id`)
              KEY `FK_3373bsd2341s8965d921231231sbc` (`music_id`)
             CONSTRAINT `FK_3373bsd2341s8965d9212333sbc` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
             CONSTRAINT `FK_3373bsd2341s8965d921231231sbc` FOREIGN KEY (`music_id`) REFERENCES `musics` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
            PRIMARY KEY (`id`)) 
            ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

  CREATE TABLE `music_embedding` ( 
            `id` int(11) NOT NULL AUTO_INCREMENT
            `music_id` int(11) DEFAULT NULL
            `embedding` LONGTEXT NOT NULL
             `created_at` TIMESTAMP NOT NULL DEFAULT (UTC_TIMESTAMP)
            `updated_at` TIMESTAMP NOT NULL DEFAULT (UTC_TIMESTAMP)
              KEY `FK_3373bsd2341s8965d92123112sbc` (`music_id`)
             CONSTRAINT `FK_3373bsd2341s8965d93433sbc` FOREIGN KEY (`music_id`) REFERENCES `musics` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
            PRIMARY KEY (`id`)) 
            ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

 CREATE TABLE `user_liked` ( 
            `id` int(11) NOT NULL AUTO_INCREMENT
            `user_id` int(11) DEFAULT NULL
            `music_id` int(11) DEFAULT NULL
             `created_at` TIMESTAMP NOT NULL DEFAULT (UTC_TIMESTAMP)
              `updated_at` TIMESTAMP NOT NULL DEFAULT (UTC_TIMESTAMP)
              KEY `FK_3373bsd2341s8965d94365sbc` (`user_id`)
              KEY `FK_3373bsd2341s8965d921a123sbc` (`music_id`)
             CONSTRAINT `FK_3373bsd2341s8965d94365sbc` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
             CONSTRAINT `FK_3373bsd2341s8965d921a123sbc` FOREIGN KEY (`music_id`) REFERENCES `musics` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
            PRIMARY KEY (`id`)) 
            ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;