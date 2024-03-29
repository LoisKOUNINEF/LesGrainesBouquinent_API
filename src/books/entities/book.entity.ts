import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';
import { CommonEntity } from 'common/entities/common.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, RelationId } from 'typeorm';

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

  @Column({ nullable: true })
  @IsUrl()
  pictureUrl: string;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.books, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn()
  user: User;

  @ApiProperty({ type: () => Comment })
  @OneToMany(() => Comment, (comment) => comment.book, {
    cascade: true,
  })
  comments: Comment[];

  @RelationId((self: Book) => self.user)
  readonly userId: User['id'];
}
