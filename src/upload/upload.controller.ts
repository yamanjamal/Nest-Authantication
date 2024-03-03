import {
  Controller,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MyLoggerService } from 'src/my-logger/my-logger.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  private logger = new MyLoggerService(UploadController.name);
  constructor(private uploadService: UploadService) {}

  @Post('s3')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'upload files to s3' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successfully uploaded file to s3',
  })
  @UseInterceptors(FilesInterceptor('files'))
  async uploadS3(
    @UploadedFiles()
    file: Express.Multer.File,
  ) {
    this.logger.log(`UploadController:uploadS3...`, UploadController.name);
    console.log(file);
    console.log(file.originalname, file.buffer);
    this.uploadService.uploadFilesS3(file.originalname, file.buffer);
  }

  @Post('files')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'upload array of files' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successfully uploaded files',
  })
  @UseInterceptors(FilesInterceptor('files'))
  async upload(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'png',
        })
        // .addMaxSizeValidator({
        //   maxSize: 10000,
        // })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    files: Array<Express.Multer.File>,
  ): Promise<any> {
    this.logger.log(`UploadController:upload...`, UploadController.name);
    console.log(files);
  }
}
