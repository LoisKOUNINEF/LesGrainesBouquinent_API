import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/authentication/guards/authenticated.guard';
import { Owner } from 'src/authorization/owner.decorator';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(AuthenticatedGuard)
  @ApiCreatedResponse({ type: Comment, description: 'Creates a new comment.' })
  @ApiBadRequestResponse()
  @Post()
  create(
    @Request() req,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    return this.commentsService.create(req.user.id, createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Owner(true)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Owner(true)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
