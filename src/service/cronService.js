import cron from "node-cron";
import moment from "moment";
import sendEmail from "./emailServices.js";
import loanRepositories from "../repositories/loanRepositories.js";


cron.schedule("56 * * * *", async () => {
    console.log("Running daily job check for due dates...");
    const loans = await loanRepositories.findAllLoansRepository();
    const today = moment().startOf("day");

    // percorre todos os emprestimos da tabela loans e verifica se a data de vencimento chegou ou se a data de vencimento chegou 1 dia antes
    loans.forEach(async (loan) => {
        const dueDate = moment(loan.dueDate).startOf("day");
        const reminderDueDate = moment(dueDate).subtract(1, "days");

        if (today.isSame(reminderDueDate)) {
            sendEmail(loan.email, loan.title, loan.dueDate);
        }
    });
});
