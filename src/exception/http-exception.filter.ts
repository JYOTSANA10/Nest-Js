import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
  } from "@nestjs/common";
  
  @Catch()
  export class HttpExecptionFilter<T> implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
      host
        .switchToHttp()
        .getResponse()
        // .status(exception.getStatus())
        .render("404-page");
    }
  }
  