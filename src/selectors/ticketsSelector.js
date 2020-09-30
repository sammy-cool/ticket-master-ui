export const filterByDept = (tickets, department) => {
    return tickets.filter(ticket => ticket.department === department)
}

export const findTicket = (tickets, id) => {
    return tickets.find(ticket => ticket._id === id)
}