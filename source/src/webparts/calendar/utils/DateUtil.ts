export class DateUtil {

  public static today(): Date {
    const date = new Date();
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
  }

  public static prevMonth(input: Date): Date {
    const output = new Date(
      input.getFullYear(),
      input.getMonth(),
      input.getDate()
    );
    output.setMonth(input.getMonth() - 1);
    return output;
  }

  public static nextMonth(input: Date): Date {
    const output = new Date(
      input.getFullYear(),
      input.getMonth(),
      input.getDate()
    );
    output.setMonth(input.getMonth() + 1);
    return output;
  }

  public static prevDay(input: Date): Date {
    const output = new Date(
      input.getFullYear(),
      input.getMonth(),
      input.getDate()
    );
    output.setDate(input.getDate() - 1);
    return output;
  }

  public static nextDay(input: Date): Date {
    const output = new Date(
      input.getFullYear(),
      input.getMonth(),
      input.getDate()
    );
    output.setDate(input.getDate() + 1);
    return output;
  }

  public static beginOfMonth(input: Date): Date {
    const output = new Date(
      input.getFullYear(),
      input.getMonth(),
      1
    );
    return output;
  }

  public static endOfMonth(input: Date): Date {
    const output = new Date(
      input.getFullYear(),
      input.getMonth() + 1,
      0
    );
    return output;
  }

  public static beginOfWeek(input: Date): Date {
    const output = new Date(
      input.getFullYear(),
      input.getMonth(),
      input.getDate()
    );
    output.setDate(input.getDate() - input.getDay());
    return output;
  }

  public static endOfWeek(input: Date): Date {
    const output = new Date(
      input.getFullYear(),
      input.getMonth(),
      input.getDate()
    );
    output.setDate(input.getDate() + 6 - input.getDay());
    return output;
  }

}