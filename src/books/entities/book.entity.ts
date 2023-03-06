import { ApiProperty } from '@nestjs/swagger';
import { CommonEntity } from 'common/entities/common.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Book extends CommonEntity {
  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  author: string;

  @Column({ type: 'text' })
  @ApiProperty()
  description: string;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.books, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  user: User;

  @ApiProperty({ type: () => Comment })
  @OneToMany(() => Comment, (comment) => comment.book, {
    cascade: true,
  })
  comments: Comment[];
}
